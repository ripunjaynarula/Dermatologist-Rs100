import Helmet from 'react-helmet';
import React from 'react';

const icon192 = "https://dermatologistin100rs.com/logo.png";
const icon16 = "https://dermatologistin100rs.com/logo.png";
const icon32 = "https://dermatologistin100rs.com/logo.png";
const icon512 = "https://dermatologistin100rs.com/logo512.png";
const _image = "https://dermatologistin100rs.com/logoc512.png"
const Seo = ({ meta, image, title, description, pathSlug, keywords, twitter_summary }) => {
    const metaDescription = description || "Dr. Sandesh Gupta is a Dermatologist in Delhi, Consult in Rs.100, Book appointments and online consultation, Get skin care";

    const defaultTitle = title || "Dr. Sandesh Gupta - Dermatologist consultation in Rs.100 - Book Appointment Online - Skin Care"
    const url = pathSlug ?
        process.env.REACT_APP_API_URL + pathSlug :
        process.env.REACT_APP_API_URL;
    const metaImage = image ? image : _image;
    const summary = twitter_summary || metaDescription
    const metadata = meta || {};

    return ( <
        Helmet htmlAttributes = {
            { lang: 'en' }
        } {...({
                title: defaultTitle,
            })
        }
        meta = {
            [{
                    name: 'google-site-verification',
                    content: 'rdHghgE19nXaz19_OXvkv_MuEOSHl8lQPesWUmp21oU',
                },
                {
                    name: 'description',
                    content: metaDescription,
                },
                {
                    name: 'keywords',
                    content: keywords ? keywords : metaDescription,
                },
                {
                    property: 'og:url',
                    content: url,
                },
                {
                    property: 'og:title',
                    content: defaultTitle,
                },
                {
                    name: 'og:description',
                    content: metaDescription,
                },
                {
                    name: 'twitter:card',
                    content: summary,
                },
                {
                    name: 'twitter:creator',
                    content: "Twitter content",
                },
                {
                    name: 'twitter:title',
                    content: defaultTitle,
                },
                {
                    name: 'twitter:description',
                    content: metaDescription,
                },
            ]
            .concat(
                metaImage ? [
                    { property: 'og:image', content: metaImage },
                    { name: 'twitter:image', content: metaImage },
                ] : []
            )
            .concat(metadata)
        }
        link = {
            [{
                    rel: 'canonical',
                    href: url,
                },




                {
                    rel: 'icon',
                    type: 'image/png',
                    href: icon16,
                    sizes: '16x16',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: icon32,
                    sizes: '32x32',
                },
                {
                    rel: 'apple-touch-icon',
                    type: 'image/png',
                    href: icon192,
                    sizes: '192x192',
                },
                {
                    rel: 'apple-touch-startup-image',
                    type: 'image/png',
                    href: icon512,
                    sizes: '512x512',
                },
            ]
        }
        />
    );
};

export default Seo;