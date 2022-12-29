import { Avatar, Box, FormControl, NativeSelect } from '@material-ui/core'
import React from 'react'

function Navbar() {
  return (
    <div>
           <Box sx={{ justifyContent: "flex-end" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "end", padding: "20px" }}>


          <FormControl>

            <NativeSelect
              defaultValue={1}
              inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
              }}
            >

              <option value={1}>Admin</option>
            </NativeSelect>
          </FormControl>
          <div style={{ marginLeft: "30px" }}>
            <Avatar
              sx={{ bgcolor: 'primary' }}
              alt="Remy Sharp"
            >
              B
            </Avatar>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Navbar
