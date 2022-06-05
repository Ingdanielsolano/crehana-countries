const groupBy = function (xs: any, key: string) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key].code] = rv[x[key].code] || []).push(x);
    return rv;
  }, {});
};

export default groupBy;
