import { Model } from "../../src/slider/MVC/Model";

describe("TESTS FOR SLIDER CLASS \"Model\": ", () => {
  let model = new Model(null);

  describe(" - Option validation methods ", () => {

    describe(" 1. getValidStep(step: number, min: number, max: number)\n min = -10; max = 10 ", () => {
      const min = -10;
      const max = 10;
      const stepsArray = [null, -1, 3, 1000, 2.3];
      const validSteps = [2, 2, 3, 20, 2.3];

      stepsArray.forEach((step, i) => {
        test(`valid step for ${step} is ${validSteps[i]}`, () => {
          expect(model["getValidStep"](step, min, max)).toBe(validSteps[i]);
        });
      });
    });

   describe(" 2. getValidMaxScaleNumbersCount(maxScaleNumbersCount: number)",()=>{
       const countArray =[-32, null,2, 100]
       const validCount = [2,10,2,100]

       countArray.forEach((count,i)=>{
         test(`valid max count for ${count} is ${validCount[i]}`,()=>{
          expect(model["getValidMaxScaleNumbersCount"](count)).toBe(validCount[i]);
         })
       })
   })
  });


});
