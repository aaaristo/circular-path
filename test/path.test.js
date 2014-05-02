var should= require('chai').should(),
    assert= require('chai').assert,
    cpath=  require('../index.js');

var cir= function ()
{
    var a= { nome: 'Andrea' },
        e= { nome: 'Elena' };

    a.figlia= e;
    a.figlia2= e;
    e.papa= a;

    return [a,3,[e,a]];
};

describe('region',function ()
{
       it('navigate paths containing arrays, and objects', function (done)
       {
           var gph= cir(), n=0;

           cpath(gph,'figlia.papa.figlia',function (daughter,dad,daughter1,dad1)
           {
               n++;

               should.exist(daughter); 
               should.exist(dad); 
               should.exist(daughter1); 
               should.exist(dad1); 

               dad1.should.equal(gph[0]);
               dad.should.equal(dad);
               daughter.should.equal(gph[0].figlia);
               daughter1.should.equal(daughter);
           });

           n.should.equal(2);

           done();
       });
});
