import { CompositeUiProps } from '../CompositeUi/types'
import mock from './data.json'

export const fetchViews = () => Promise.resolve(mock.views as unknown as CompositeUiProps[])
