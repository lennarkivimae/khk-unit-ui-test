import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import Login from '@/components/Login';
import 'intersection-observer';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('login', () => {
    describe('when not logged in', () => {
        const loginModule = {
            state: {
                loggedin: false
            },
            getters: {
                loggedin: (state) => {
                    return state.loggedin;
                }
            },
        };

        const store = new Vuex.Store ({
            modules: {
                login: loginModule
            }
        })

        const wrapper = mount(Login, {localVue, store});

        it('displays login', () => {
            expect(wrapper.find('.login__heading').exists()).toBe(true);
        });
    });

    describe('when logged in', () => {
        const loginModule = {
            state: {
                loggedin: true
            },
            getters: {
                loggedin: (state) => {
                    return state.loggedin;
                }
            },
        };

        const store = new Vuex.Store ({
            modules: {
                login: loginModule
            }
        })

        const wrapper = mount(Login, {localVue, store});

        it('does not display login', () => {
            expect(wrapper.find('.login__heading').exists()).toBe(false);
        });
    });
});
