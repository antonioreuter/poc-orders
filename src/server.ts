'use strict';

import app from './app/application';

const PORT = process.env.PORT || 3000;

app.createApp().listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});