import { defineType } from "sanity";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            validation: (rule) => rule.required(),
            type: "string",
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [{ type: "string" }],
        },
        {
            name: "productImage",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Product Image",
        },
        {
            name: "price",
            type: "number",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name: "discountPercentage",
            type: "number",
            title: "Discount Percentage",
        },
        {
            name: "isNew",
            type: "boolean",
            title: "New Badge",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                slugify: (input) => input.toLowerCase().replace(/\s+/g, "-"),
            },
        },
        {
            name: "description",
            title: "Description",
            type: "text", // Using "text" for multi-line input; use "string" for single-line input
            validation: (rule) => rule.required(), // Add validation if the description is mandatory
        },
    ],
});
