# Backend Routes

## Notes:
Routes still need their `POST` / `PUT` `body` defined as well as the responses.

## Users
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/auth</b></code>
        <code>(get currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>GET</code>
        <code><b>/api/auth/logout</b></code>
        <code>(sign out currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/auth/login</b></code>
        <code>(sign in)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/auth/signup</b></code>
        <code>(signup a new user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Expense
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/expenses</b></code>
        <code>(get all expenses for the currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/expenses</b></code>
        <code>(create an expense for the currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>PUT</code>
        <code><b>/api/expenses/:id</b></code>
        <code>(edit an expense)</code>
    </summary>

##### Parameters

> | name | type     | data type | description               |
> |------|----------|-----------|---------------------------|
> | id   | required | string    | The id of the the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/expenses/:id</b></code>
        <code>(delete an expense)</code>
    </summary>

##### Parameters

> | name | type     | data type | description               |
> |------|----------|-----------|---------------------------|
> | id   | required | string    | The id of the the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Expense Debits
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/expenses/:id/debits</b></code>
        <code>(get all debits for an expense)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description               |
> |----------|-----------|-----------|---------------------------|
> | id       |  required | string    | The id of the the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/expenses/:id/debits</b></code>
        <code>(create a debit for an expense)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description               |
> |----------|-----------|-----------|---------------------------|
> | id       |  required | string    | The id of the the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/expenses/:id/debits</b></code>
        <code>(delete all debits for an expense)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description               |
> |----------|-----------|-----------|---------------------------|
> | id       |  required | string    | The id of the the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>PUT</code>
        <code><b>/api/expense-debits/:id</b></code>
        <code>(edit an expense debit)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description             |
> |----------|-----------|-----------|-------------------------|
> | id       |  required | string    | The id of the the debit |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/expense-debits/:id</b></code>
        <code>(delete an expense debit)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description             |
> |----------|-----------|-----------|-------------------------|
> | id       |  required | string    | The id of the the debit |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Expense Credits
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/expense-credits/user/:id</b></code>
        <code>(get all credits paid to a user)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description                               |
> |----------|-----------|-----------|-------------------------------------------|
> | id       |  required | string    | The id of the user the credit was paid to |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>GET</code>
        <code><b>/api/expense-credits/group/:id</b></code>
        <code>(get all credits paid to a group)</code>
    </summary>

##### Parameters

> | name     |  type     | data type | description                                |
> |----------|-----------|-----------|--------------------------------------------|
> | id       |  required | string    | The id of the group the credit was paid to |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/expense-credits</b></code>
        <code>(create an expense credit)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>PUT</code>
        <code><b>/api/expense-credits/:id</b></code>
        <code>(update an expense credit)</code>
    </summary>

##### Parameters

> | name | type     | data type | description           |
> |------|----------|-----------|-----------------------|
> | id   | required | string    | The id of the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/expense-credits/:id</b></code>
        <code>(delete an expense credit)</code>
    </summary>

##### Parameters

> | name | type     | data type | description           |
> |------|----------|-----------|-----------------------|
> | id   | required | string    | The id of the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Expense Comments
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/expenses/:id/comments</b></code>
        <code>(get all comments for an expense)</code>
    </summary>

##### Parameters

> | name | type     | data type | description           |
> |------|----------|-----------|-----------------------|
> | id   | required | string    | The id of the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/expenses/:id/comments</b></code>
        <code>(create a comment for an expense)</code>
    </summary>

##### Parameters

> | name | type     | data type | description           |
> |------|----------|-----------|-----------------------|
> | id   | required | string    | The id of the expense |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>PUT</code>
        <code><b>/api/comment/:id</b></code>
        <code>(edit a comment)</code>
    </summary>

##### Parameters

> | name | type     | data type | description           |
> |------|----------|-----------|-----------------------|
> | id   | required | string    | The id of the comment |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/comment/:id</b></code>
        <code>(delete a comment)</code>
    </summary>

##### Parameters

> | name | type     | data type | description           |
> |------|----------|-----------|-----------------------|
> | id   | required | string    | The id of the comment |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Groups
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/groups</b></code>
        <code>(get all groups the the currently authenticated user belongs to)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/groups</b></code>
        <code>(create a group)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>PUT</code>
        <code><b>/api/groups/:id</b></code>
        <code>(update a group (must belong to the group))</code>
    </summary>

##### Parameters

> | name | type     | data type | description         |
> |------|----------|-----------|---------------------|
> | id   | required | string    | The id of the group |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/groups/:id</b></code>
        <code>(delete a group (must belong to the group))</code>
    </summary>

##### Parameters

> | name | type     | data type | description         |
> |------|----------|-----------|---------------------|
> | id   | required | string    | The id of the group |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Group Members
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/groups/:id/members</b></code>
        <code>(get all members of a group (must belong to the group))</code>
    </summary>

##### Parameters

> | name | type     | data type | description         |
> |------|----------|-----------|---------------------|
> | id   | required | string    | The id of the group |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/groups/:id/members</b></code>
        <code>(add members to a group (must belong to the group))</code>
    </summary>

##### Parameters

> | name | type     | data type | description         |
> |------|----------|-----------|---------------------|
> | id   | required | string    | The id of the group |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>DELETE</code>
        <code><b>/api/groups/:id/members</b></code>
        <code>(delete members from a group (must belong to the group))</code>
    </summary>

##### Parameters

> | name | type     | data type | description         |
> |------|----------|-----------|---------------------|
> | id   | required | string    | The id of the group |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

## Friends
<details>
     <summary>
        <code>GET</code>
        <code><b>/api/friends</b></code>
        <code>(get all the friends of the currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/friends/add</b></code>
        <code>(add friends to the currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>

<details>
     <summary>
        <code>POST</code>
        <code><b>/api/friends/delete</b></code>
        <code>(delete friends of the currently authenticated user)</code>
    </summary>

##### Parameters

> | name | type | data type | description |
> |------|------|-----------|-------------|
> | None | N/A  | N/A       | N/A         |

##### Responses

> | http code | content-type                      | response                             |
> |-----------|-----------------------------------|--------------------------------------|
> | `200`     | `application/json`                | `{...}`                              |
</details>
