import { pool } from '../db.js';

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employers');
    res.json({ rows });
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employers WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: 'Empleado no encontrado',
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      'INSERT INTO employers (name, salary) VALUES (?, ?)',
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE employers SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Empleado no encontrado' });

    const [rows] = await pool.query('SELECT * FROM employers WHERE id= ?', [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employers WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'Empleado no encontrado' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong',
    });
  }
};

// GetEmployee es una función asíncrona que espera a que se resuelva la promesa
// de la consulta a la base de datos. Cuando se resuelve, se obtiene un array
// con los resultados de la consulta. Ese array se desestructura en la variable
// rows. Luego, se envía la respuesta al cliente con el método json() de la
// respuesta, que espera un objeto como parámetro. En este caso, se envía un
// objeto con una propiedad rows, que es el array con los resultados de la
// consulta.

// GetEmployees es una función asíncrona que espera a que se resuelva la promesa
// de la consulta a la base de datos. Cuando se resuelve, se obtiene un array
// con los resultados de la consulta. Ese array se desestructura en la variable
// rows. Luego, se envía la respuesta al cliente con el método json() de la
// respuesta, que espera un objeto como parámetro. En este caso, se envía un
// objeto con una propiedad rows, que es el array con los resultados de la
// consulta.

// CreateEmployee es una función asíncrona que espera a que se resuelva la
// promesa de la consulta a la base de datos. Cuando se resuelve, se obtiene un
// array con los resultados de la consulta. Ese array se desestructura en la
// variable rows. Luego, se envía la respuesta al cliente con el método send()
// de la respuesta, que espera un objeto como parámetro. En este caso, se envía
// un objeto con las propiedades id, name y salary, que son los valores que se
// insertaron en la base de datos.

// UpdateEmployee es una función asíncrona que espera a que se resuelva la
// promesa de la consulta a la base de datos. Cuando se resuelve, se obtiene un
// array con los resultados de la consulta. Ese array se desestructura en la
// variable result. Luego, se verifica si la propiedad affectedRows del objeto
// result es igual a 0, lo que significa que no se encontró ningún empleado con
// el id que se envió en la petición. Si es igual a 0, se envía una respuesta
// con el código 404 y un mensaje de error. Si no es igual a 0, se hace otra
// consulta a la base de datos para obtener el empleado que se actualizó. Luego,
// se envía la respuesta al cliente con el método json() de la respuesta, que
// espera un objeto como parámetro. En este caso, se envía un objeto con la
// propiedad rows, que es el array con los resultados de la consulta.

// DeleteEmployee es una función asíncrona que espera a que se resuelva la
// promesa de la consulta a la base de datos. Cuando se resuelve, se obtiene un
// array con los resultados de la consulta. Ese array se desestructura en la
// variable result. Luego, se verifica si la propiedad affectedRows del objeto
// result es igual a 0, lo que significa que no se encontró ningún empleado con
// el id que se envió en la petición. Si es igual a 0, se envía una respuesta
// con el código 404 y un mensaje de error. Si no es igual a 0, se envía una
// respuesta con el código 204, que significa que no hay contenido en la
// respuesta.

// Se exportan las funciones para poder usarlas en el archivo index.js
