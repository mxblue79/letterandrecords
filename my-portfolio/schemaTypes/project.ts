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
            title: 'Main Image (Poster)',
            description: 'The representative image shown in the list and first in detail.',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'gallery',
            title: 'Sub Images (Gallery)',
            description: 'Additional images for the main slider (Main Image comes first, then these).',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'spreads',
            title: 'Book Spreads (Landscape Viewer)',
            description: 'Horizontal images shown between main info and detailed content.',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
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
        // Publication Spec Fields
        defineField({
            name: 'size',
            title: 'Size/Dimensions (규격)',
            type: 'string',
            description: 'e.g. 148 x 210 mm'
        }),
        defineField({
            name: 'pages',
            title: 'Pages (쪽수)',
            type: 'string',
            description: 'e.g. 240p'
        }),
        defineField({
            name: 'paper',
            title: 'Paper (용지)',
            type: 'string',
            description: 'e.g. Munken Pure 120g'
        }),
        defineField({
            name: 'finishing',
            title: 'Finishing (후가공)',
            type: 'string',
            description: 'e.g. Foil Stamping, Exposed Binding'
        }),
        defineField({
            name: 'salesUrl',
            title: 'Sales Link (판매처)',
            type: 'url',
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
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H1', value: 'h1' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                            { title: 'Strike', value: 'strike-through' },
                            // Text Alignment Decorators
                            { title: 'Left', value: 'left' },
                            { title: 'Center', value: 'center' },
                            { title: 'Right', value: 'right' },
                        ]
                    }
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Caption',
                        },
                        {
                            name: 'layout',
                            type: 'string',
                            title: 'Alignment',
                            options: {
                                list: [
                                    { title: 'Center', value: 'center' },
                                    { title: 'Left', value: 'left' },
                                    { title: 'Right', value: 'right' },
                                ],
                                layout: 'radio',
                                direction: 'horizontal'
                            },
                            initialValue: 'center'
                        },
                        {
                            name: 'size',
                            type: 'string',
                            title: 'Size',
                            options: {
                                list: [
                                    { title: 'Full Width', value: 'full' },
                                    { title: 'Large', value: 'large' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Small', value: 'small' },
                                ],
                                layout: 'radio',
                                direction: 'horizontal'
                            },
                            initialValue: 'full'
                        }
                    ]
                }
            ],
        }),
    ],
})
