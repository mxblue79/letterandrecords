import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Internal use only (e.g. "Global Settings")',
            initialValue: 'Global Settings',
            readOnly: true,
        }),
        defineField({
            name: 'companyProfile',
            title: 'Company Profile (PDF)',
            type: 'file',
            description: 'Upload the company profile PDF here (max 100MB)',
            options: {
                accept: '.pdf'
            }
        }),
        defineField({
            name: 'bookstoreGallery',
            title: 'Bookstore Gallery',
            type: 'array',
            description: 'Upload images for the Bookstore page carousel (recommended: 10 images)',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid'
            }
        }),
    ],
})
