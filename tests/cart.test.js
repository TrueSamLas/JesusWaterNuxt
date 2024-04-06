import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { it, expect, describe} from 'vitest';
import cart from '~/pages/cart.vue';

mockNuxtImport('useFetch', () => {
    return () => {
        return {
            data: {
                value: [
                    {
                        id: 1,
                        name: 'Wine #1',
                        price: 100,
                        image: '',
                    },
                    {
                        id: 2,
                        name: 'Wine #2',
                        price: 200,
                        image: '',
                    },
                    {
                        id: 3,
                        name: 'Wine #3',
                        price: 300,
                        image: '',
                    },
                ],
            }
        }
    }
})

mockNuxtImport('useLocalStorage', () => {
    return () => {
        return {
            value: new Map([
                [1, 6],
                [3, 10],
            ])
        }
    }
})

describe('cart', () => {
    it('Отображение каталога', async () => {
        const component = await mountSuspended(cart)
        const html = component.html();

        expect(html)
            .toContain('Wine #1')
            .toContain('600')

        expect(html)
            .toContain('Wine #3')
            .toContain('3000')
    })
})