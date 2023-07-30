import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from './sanity.config'

export default defineCliConfig({
  api: {
    projectId: 'xhqnd9hi',
    dataset: 'production',
  },
})
