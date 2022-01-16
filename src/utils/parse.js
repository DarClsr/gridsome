
export const expandObj=(obj)=>{
    return Object.keys(obj).reduce((result,cur)=>{
      return   result= typeof obj[cur]==="object"? {...result,...expandObj(obj[cur])}: {
            ...result,
            [`${cur}`]:obj[cur]
        }
    },{})
}


export const parseObj=({edges},single)=>{
    const results=edges.map(v=>{
        return expandObj(v.node);
    })
    return single?results[0]:results
}
