import { injectJsError } from './lib/jsError.js'
import { injectXHR } from './lib/xhr.js';
import { timing } from './lib/timing.js';
injectJsError();
injectXHR();
timing()