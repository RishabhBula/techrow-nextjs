// @Rishabh Bula
// Contentfull connection

import { createClient } from "contentful";
import * as _ from "lodash";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFULL_SPACEID, // space
  accessToken: process.env.NEXT_PUBLIC_CONTENTFULL_ACCESSTOKEN, // accessToken
  value: 999
});

export const getContent = async (contentType, order, fields) => {

    const query = buildQuery(contentType, order, fields);
    // debugger;
    const response = await client.getEntries(query);
    return _.get(response, 'items');
}
export const getAllContent = async () => {

    const response = await client.getEntries();
    return _.get(response, 'items');
}

const buildQuery = (contentType, order, fields) => {
    const q = {};
    if(fields) {
        q.fields = fields;
    }
    if(order){
        q.order = order;
    }
    if(contentType){
        q.content_type = contentType;
    }
    q.limit = 999;
    return q;
}

