import { css } from 'styled-components'

import { fromTheme } from 'app/utils/theme'

export function cellStyle(width) {
  return css`
    border: 1px solid ${fromTheme('color.divider')};
    padding: 10px;
    width: ${width};
  `
}
