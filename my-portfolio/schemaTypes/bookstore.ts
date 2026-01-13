import { defineField, defineType } from 'sanity'

export const bookstoreType = defineType({
    name: 'bookstore',
    title: 'Bookstore',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Bookstore Gallery',
            readOnly: true,
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid'
            }
        }),
    ],
})
