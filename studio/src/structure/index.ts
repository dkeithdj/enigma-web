export const structure = (S : any, context : any) =>
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
        (listItem : any) =>
          ![
            'siteSettings',
            // 'documents',
            // 'post',
            // 'category',
            // 'author',
          ].includes(listItem.getId())
      ),
    ])
