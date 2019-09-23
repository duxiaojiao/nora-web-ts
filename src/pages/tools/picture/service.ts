import request from "@/utils/request";


export async function queryPicture() {
  return request('/tools/files/picture', {
    method: 'GET',
  });
}
