import {ThemeName} from '@common/types';

/**
 * Interface representing an application theme.
 * It includes properties for the theme's name and icon.
 * @author dgutierrez
 */
export interface IAppTheme {
  name: ThemeName;
  icon: string;
  label: string;
}
