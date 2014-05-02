module.exports= function (gph,path,cb)
{
       var _path= path.split('.'),
           stack= [{ val: gph, part: -1 }];

       while (stack.length)
       {
           var current= stack.pop(); 

           if (Array.isArray(current.val))
             current.val.forEach(function (el)
             {  
                stack.push({ val: el, part: current.part, p: current.p });
             });
           else
           {
             var part= _path[current.part+1],
                 next= current.val[part];

             if (next)
               stack.push({ val: next, part: current.part+1, p: current }); 
             else
             if (current.part+1==_path.length)
             {
                 var args= [], c= current;

                 while (c)
                 {
                    args.push(c.val);
                    c= c.p;
                 } 

                 if (cb.apply(null,args)) return;
             }   
           }
       }
};
