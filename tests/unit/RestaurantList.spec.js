import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';
import restaurants from '../../src/store/restaurants';
import 'intersection-observer';

const records = [
  {id: 1, name: 'Sushi Place'},
  {id: 2, name: 'Pizza Place'},
];


let restaurantsModule;
let wrapper;

const findByTestId = (wrapper, testId, index) => wrapper.findAll(`[data-testid="${testId}"]`).at(index);

Vue.use(Vuetify);
const vuetify = new Vuetify();
const localVue = createLocalVue();
localVue.use(Vuex);

describe('RestaurantList', () => {
  const mountWithStore = (state = {records, loading: false}) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });
    wrapper = mount(RestaurantList, {localVue, store, vuetify});
  };

  beforeEach(() => {
    mountWithStore();
    restaurantsModule = {
      namespaced: true,
      state: {records},
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });
    wrapper = mount(RestaurantList, {localVue, store, vuetify});
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      mountWithStore({loadError: true});
    });

    it('displays the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(true);
    });
  });

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({loading: true});
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(true);
  })

  describe('when loading succeeds', () => {
    const mountWithStore = (state = {records, loading: false}) => {
      restaurantsModule = {
        namespaced: true,
        state,
        actions: {
          load: jest.fn().mockName('load'),
        },
      };
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurantsModule,
        },
      });
      wrapper = mount(RestaurantList, {localVue, store, vuetify});
    };

    beforeEach(() => {
      mountWithStore();
    });

    it('displays the restaurants', () => {
      mountWithStore();
      expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
      expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
    });

    it('does not display the loading indicator while not loading', () => {
      mountWithStore();
      expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(false);
    });

    it('does not display the error message', () => {
      expect(wrapper.find('[data-testid="loading-error"]').exists()).toBe(false);
    });
  });
});
