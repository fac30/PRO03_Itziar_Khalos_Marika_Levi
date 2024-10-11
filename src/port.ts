import { app } from './index';

// Convert PORT to a number, as `process.env.PORT` is a string
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});


