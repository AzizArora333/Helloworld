
const setData = require("../data/setData");
const themeData = require("../data/themeData");
let sets = [];

// This is the Function we will be performing to initialize the sets array
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      setData.forEach(set => {
        const objThem = themeData.find(theme => theme.id === set.theme_id);
        if (objThem) {
          const nS = { ...set, theme: objThem.name };
          sets.push(nS);
        }
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

// This is the Function we will be performing to get all sets
function getAllSets() {
  return new Promise((resolve, reject) => 
  {
    try {
      resolve(sets);
    } catch (err) {
      reject(err);
    }
  });
}

// This is the Function we will be performing to get a set by set_num
function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
      const set = sets.find(set => set.set_num === setNum);
      if (set)
          resolve(set);
      else
          reject("Unable to find requested set.")
  });
}

// This is the Function we will be performing to get the sets by theme
function getSetsByTheme(theme) 
{
  return new Promise((resolve, reject) => 
  {
    try 
    {
      const caseLo = theme.toLowerCase();
      const sameSet = sets.filter(set => set.theme.toLowerCase().includes(caseLo));
      resolve(sameSet);
    }
     catch (err) 
    {
      reject(err);
    }
  });
}
// This is to export the modules in the modules.exports
module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
initialize()
  .then(() => 
  {
    return getAllSets();
  })
  .then(setList => 
    {
    console.log("All Sets:", setList);
    return getSetByNum("0011-2");
  })    
  .then(uniqSet => 
    {
    console.log("Specific Set:", uniqSet);
    return getSetsByTheme("tech");
  })
  .then(setThem => 
    {
    console.log("Sets by Theme:", setThem);
  })
  .catch(err => 
    {
    console.log("error:", err);
  });