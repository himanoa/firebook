import { css, CSSResult } from 'lit'

type GridAreaClassName = string;
type GridAreaDefinitions = CSSResult;

export const gridArea = (areaName: CSSResult): [GridAreaClassName, GridAreaDefinitions]=> {
  const name =  areaName.toString()
  return [name, css`& > .${css`${areaName}`} { grid-area: "${areaName}"; };`]
}
