import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { it, expect, describe} from 'vitest';
import Catalog from '~/components/Catalog.vue';

mockNuxtImport('useFetch', () => {
    return () => {
        return {
            data: {
                value: [
                    {
                        name: 'Wine #1',
                        price: 100,
                        image: '',
                    },
                    {
                        name: 'Wine #2',
                        price: 200,
                        image: '',
                    },
                    {
                        name: 'Wine #3',
                        price: 300,
                        image: '',
                    },
                ],
            }
        }
    }
})

describe('Catalog', () => {
    it('Отображение каталога', async () => {
        const component = await mountSuspended(Catalog)
        const html = component.html();

        expect(html)
            .toContain('Wine #1')
            .toContain('100')

        expect(html)
            .toContain('Wine #2')
            .toContain('200')

        expect(html)
            .toContain('Wine #3')
            .toContain('300')
    })
})