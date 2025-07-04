import {RolesEnum} from '@common/enums';

/**
 * Interface representing a menu item in the application.
 * @author dgutierrez
 */
export interface IMenuItem {
  /**
   * The name of the icon to be displayed for the menu item.
   */
  icon: string;

  /**
   * The label for the menu item, typically displayed in the UI.
   */
  label: string;

  /**
   * The route path associated with the menu item.
   * This is used for navigation within the application.
   */
  route: string;

  /**
   * Optional property to indicate if the menu item is displayed in the sidebar.
   */
  isDisabled?: boolean;

  /**
   * Optional property to indicate if the menu item is displayed in the topbar.
   */
  children?: IMenuItemChild[];

  click: VoidFunction;

  authorities: RolesEnum[]
}

/**
 * Interface representing a child menu item.
 * @author dgutierrez
 */
export interface IMenuItemChild extends Omit<IMenuItem, 'icon' | 'children'> {
}
