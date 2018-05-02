export default async milliseconds =>
 new Promise((resolve, reject) => setTimeout(resolve, milliseconds));
