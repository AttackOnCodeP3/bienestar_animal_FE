/**
 * Enum for Model3D component internationalization keys.
 * @author nav
 */
export enum I18nModel3DEnum {
  MODEL_3D = 'model-3d',
  
  // Component labels
  COMPONENT_TITLE = I18nModel3DEnum.MODEL_3D + 'title',
  COMPONENT_SUBTITLE = I18nModel3DEnum.MODEL_3D + 'subtitle',
  COMPONENT_DESCRIPTION = I18nModel3DEnum.MODEL_3D + 'description',
  
  // Viewer messages
  LOADING_MODEL = I18nModel3DEnum.MODEL_3D + 'loadingModel',
  LOADING_PROGRESS = I18nModel3DEnum.MODEL_3D + 'loadingProgress',
  NO_MODEL_AVAILABLE = I18nModel3DEnum.MODEL_3D + 'noModelAvailable',
  MODEL_NOT_FOUND = I18nModel3DEnum.MODEL_3D + 'modelNotFound',
  
  // Error messages
  CORS_ERROR = I18nModel3DEnum.MODEL_3D + 'errors.corsError',
  NETWORK_ERROR = I18nModel3DEnum.MODEL_3D + 'errors.networkError',
  NOT_FOUND_ERROR = I18nModel3DEnum.MODEL_3D + 'errors.notFoundError',
  CONNECTION_ERROR = I18nModel3DEnum.MODEL_3D + 'errors.connectionError',
  SERVER_ERROR = I18nModel3DEnum.MODEL_3D + 'errors.serverError',
  UNKNOWN_ERROR = I18nModel3DEnum.MODEL_3D + 'errors.unknownError',
  ANIMAL_ID_REQUIRED = I18nModel3DEnum.MODEL_3D + 'errors.animalIdRequired',
  MODEL_ID_REQUIRED = I18nModel3DEnum.MODEL_3D + 'errors.modelIdRequired',
  
  // Actions
  LOAD_MODEL = I18nModel3DEnum.MODEL_3D + 'actions.loadModel',
  RELOAD_MODEL = I18nModel3DEnum.MODEL_3D + 'actions.reloadModel',
  TOGGLE_ROTATION = I18nModel3DEnum.MODEL_3D + 'actions.toggleRotation',
  RESET_VIEW = I18nModel3DEnum.MODEL_3D + 'actions.resetView',
  
  // Status messages
  LOADING_FROM_DATABASE = I18nModel3DEnum.MODEL_3D + 'status.loadingFromDatabase',
  LOADING_FROM_URL = I18nModel3DEnum.MODEL_3D + 'status.loadingFromUrl',
  MODEL_LOADED_SUCCESSFULLY = I18nModel3DEnum.MODEL_3D + 'status.modelLoadedSuccessfully',
  
  // Generation messages
  GENERATE_MODEL = I18nModel3DEnum.MODEL_3D + 'generation.generateModel',
  GENERATING_MODEL = I18nModel3DEnum.MODEL_3D + 'generation.generatingModel',
  MODEL_GENERATED_SUCCESSFULLY = I18nModel3DEnum.MODEL_3D + 'generation.modelGeneratedSuccessfully',
  GENERATION_FAILED = I18nModel3DEnum.MODEL_3D + 'generation.generationFailed',
}