import { PluginCode } from '../enums';
import { unknownFunction } from './common.type';

export type pluginType = { type: PluginCode; cb: unknownFunction };
