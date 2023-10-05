-- 2 variants to select non friends
SELECT users.*
FROM users
       FULL JOIN users_friends_users
                 ON users.id != users_friends_users.users_id_1 AND users.id != users_friends_users.users_id_2
WHERE users_friends_users.users_id_1 = '55253808-722f-409d-af5e-3cc1d0cdda10'
   OR users_friends_users.users_id_2 = '55253808-722f-409d-af5e-3cc1d0cdda10';


SELECT u.*
FROM users u
WHERE u.id <> '55253808-722f-409d-af5e-3cc1d0cdda10'
  AND NOT EXISTS (SELECT *
                  FROM users_friends_users f
                  WHERE (f.users_id_1 = '55253808-722f-409d-af5e-3cc1d0cdda10'
                    AND f.users_id_2 = u.id)
                     OR (f.users_id_1 = u.id
                    AND f.users_id_2 = '55253808-722f-409d-af5e-3cc1d0cdda10'));


-- optimized second variant with params and count
SELECT u.*, COUNT(*) OVER () AS __count
FROM users u
WHERE u.id <> ${userId}
  AND NOT EXISTS (SELECT *
                  FROM users_friends_users f
                  WHERE (f.users_id_1 = ${userId}
                    AND f.users_id_2 = u.id)
                     OR (f.users_id_1 = u.id
                    AND f.users_id_2 = ${userId}))
OFFSET ${skip} LIMIT ${limit};