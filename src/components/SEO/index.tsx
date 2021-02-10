/* eslint-disable react/require-default-props */

import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const pageTitle = `${title}`;

  const pageImageURL = '/img/bike.png';

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="canonical" href="https://hardcore-morse-8a4db9.netlify.app/" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="title" content="Bike sharing - Convenient & Simple" />
      {description && <meta name="description" content={description} />}
      {pageImageURL && <meta name="image" content={pageImageURL} />}
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#121214" />
      <meta name="msapplication-TileColor" content="#121214" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={pageImageURL} />
      <meta property="og:image:secure_url" content={pageImageURL} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rocketseat" />
      <meta name="twitter:creator" content="@rocketseat" />
      <meta name="twitter:image" content={pageImageURL} />
      <meta name="twitter:image:src" content={pageImageURL} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="620" /> */}
    </Head>
  );
}
