import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { it, expect, describe} from 'vitest'
import News from '~/components/News.vue'

mockNuxtImport('useFetch', () => {
    return () => {
        return {
            data: {
                value: [
                    {
                        title: 'News #1',
                        image: '',
                        text: 'today',
                        date: 0,
                    },
                    {
                        title: 'News #2',
                        image: '',
                        text: 'tomorrow',
                        date: 60 * 60 * 24,
                    },
                    {
                        title: 'News #3',
                        image: '',
                        text: 'after tomorrow',
                        date: 60 * 60 * 24 * 2,
                    },
                ],
            }
        }
    }
})

describe('News', () => {
    it('Отображение новостей', async () => {
        const component = await mountSuspended(News)
        const html = component.html();

        expect(html)
            .toContain('News #1')
            .toContain('04.01.1970')

        expect(html)
            .toContain('News #2')
            .toContain('05.01.1970')

        expect(html)
            .toContain('News #3')
            .toContain('06.01.1970')
    })
})