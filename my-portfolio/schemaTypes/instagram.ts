import { defineField, defineType } from 'sanity'

export const instagramType = defineType({
    name: 'instagram',
    title: 'Instagram Feed',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'link',
            title: 'Instagram Link',
            type: 'url',
            description: 'Link to the actual post (optional)',
        }),
        defineField({
            name: 'date',
            title: 'Post Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'isPinned',
            title: 'Pin to Top (Highlight)',
            type: 'boolean',
            description: 'If enable, this post will appear at the top of the list.',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'caption',
            media: 'image',
            date: 'date',
            isPinned: 'isPinned',
        },
        prepare({ title, media, date, isPinned }) {
            return {
                title: (isPinned ? '📌 ' : '') + (title || 'No Caption'),
                subtitle: date ? new Date(date).toLocaleDateString() : '',
                media: media,
            }
        },
    },
})
