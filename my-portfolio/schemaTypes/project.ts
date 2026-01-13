import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: '아트디렉팅&디자인', value: '아트디렉팅&디자인' },
                    { title: '출판', value: '출판' },
                    { title: '자체 출판', value: '자체 출판' },
                    { title: '홍보', value: '홍보' },
                    { title: '영상', value: '영상' },
                    { title: '웹 서비스', value: '웹 서비스' },
                    { title: '행사', value: '행사' },
                    { title: '책방 곱셈', value: '책방 곱셈' }
                ],
            },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
        }),
        defineField({
            name: 'client',
            title: 'Client',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true }
                }
            ],
        }),
    ],
})
