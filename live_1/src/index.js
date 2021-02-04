const assert = require("assert");
const Employee = require("./employee");
const Util = require("./util");
const Manager = require("./manager");

const GENDER = {
  male: "male",
  female: "female",
};

{
  const employee = new Employee({
    name: "primeiro nome",
    gender: GENDER.female,
  });

  assert.throws(() => employee.birthYear, {
    message: "you must define age first!!",
  });
}

const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;

{
  const employee = new Employee({
    name: "segundo nome",
    age: 20,
    gender: GENDER.male,
  });

  assert.deepStrictEqual(employee.name, "Mr. segundo nome");
  assert.deepStrictEqual(employee.age, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.4));
  assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

  const exepectedBirthYear = 2001;
  assert.deepStrictEqual(employee.birthYear, exepectedBirthYear);
}

{
  const manager = new Manager({
    name: "terceiro nome",
    age: 18,
    gender: GENDER.female,
  });

  assert.deepStrictEqual(manager.name, "Ms. terceiro nome");
  assert.deepStrictEqual(manager.age, undefined);
  assert.deepStrictEqual(manager.gender, undefined);
  assert.deepStrictEqual(manager.birthYear, 2003);

  assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.4));
  assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000));
  assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32));
}
