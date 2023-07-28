export const structure = (S, context) =>
  S.list()
    .title('Structure Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      // S.listItem()
      //   .title('Documents')
      //   .child(S.editor().id('documents').schemaType('documents').documentId('documents')),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            // 'documents',
            // 'post',
            // 'category',
            // 'author',
          ].includes(listItem.getId())
      ),
    ])
