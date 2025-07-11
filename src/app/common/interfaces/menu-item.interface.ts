import {RolesEnum} from '@common/enums';

/**
 * Interface representing a menu item in the application.
 * Can have either:
 *   - A route and optional click handler.
 *   - Or a list of children.
 * @author dgutierrez
 */
export interface IMenuItem {
  /**
   * The icon to display.
   */
  icon: string;

  /**
   * The label.
   */
  label: string;

  /**
   * Optional route (only if no children).
   */
  route?: string;

  /**
   * Optional click handler.
   */
  click?: VoidFunction;

  /**
   * Optional children (if this is a parent).
   */
  children?: IMenuItemChild[];

  /**
   * Roles that can see this item.
   */
  authorities: RolesEnum[];

  /**
   * Optional disabled flag.
   */
  isDisabled?: boolean;
}

/**
 * Interface representing a child menu item.
 * A child always has a label, route, optional click, and authorities.
 * @author dgutierrez
 */
export interface IMenuItemChild extends Omit<IMenuItem, 'icon' | 'children'> {
  /**
   * The label for the child item.
   */
  label: string;

  /**
   * The route path associated with the child item.
   */
  route: string;

  /**
   * Optional click handler.
   */
  click?: VoidFunction;

  /**
   * Roles that can see this item.
   */
  authorities: RolesEnum[];

  /**
   * Optional disabled flag.
   */
  isDisabled?: boolean;
}
