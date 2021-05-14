import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  let store;

  describe('initially', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(),
        },
      });
    });

    it('does not have the loading flag set', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });

    it('does not have the error flag set', () => {
      expect(store.state.restaurants.loadError).toEqual(false);
    });
  });

  describe('load action', () => {
    it('stores the restaurants', async () => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });

      await store.dispatch('restaurants/load');

      expect(store.state.restaurants.records).toEqual(records);
    });
  });

  describe('when loading succeeds', () => {
    beforeEach(async () => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });
      return store.dispatch('restaurants/load');
    });

    it('stores the restaurants', () => {
      expect(store.state.restaurants.records).toEqual(records);
    });

    it('clears the loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });

  describe('while loading', () => {
    beforeEach(() => {
      const api = {
        loadRestaurants: () => new Promise(() => {}),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api, {loadError: true}),
        },
      });
      store.dispatch('restaurants/load');
    });

    it('sets a loading flag', () => {
      store.dispatch('restaurants/load');
      expect(store.state.restaurants.loading).toEqual(true);
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.reject(),
      };
      store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api, {loadError: true}),
        },
      });

      return store.dispatch('restaurants/load');
    });

    it('sets an error flag', () => {
      expect(store.state.restaurants.loadError).toEqual(true);
    });

    it('clears the loading flag', () => {
      expect(store.state.restaurants.loading).toEqual(false);
    });
  });
});
