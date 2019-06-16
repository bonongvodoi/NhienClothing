const path = require('path');

import { config } from "dotenv"

config({ path: path.join(__dirname, "../../.env.dev") })