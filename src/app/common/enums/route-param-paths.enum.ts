import {RouteParamsEnum} from '@common/enums/route-params.enum';

const PATH_PARAM_PREFIX = '/:';

/**
 * Enum representing the paths for route parameters.
 * Each path is prefixed with a colon (:) to indicate that it is a parameter.
 * @author dgutierrez
 */
export enum RouteParamPathsEnum {
  PARAM_PREFIX = PATH_PARAM_PREFIX,
  USER_ID =  RouteParamPathsEnum.PARAM_PREFIX + RouteParamsEnum.USER_ID,
  MUNICIPALITY_ID = RouteParamPathsEnum.PARAM_PREFIX + RouteParamsEnum.MUNICIPALITY_ID,
  NOTIFICATION_RULE_ID = RouteParamPathsEnum.PARAM_PREFIX + RouteParamsEnum.NOTIFICATION_RULE_ID,
}
