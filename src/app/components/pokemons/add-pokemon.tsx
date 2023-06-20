import React, { createContext, useContext, useEffect, useState } from "react";
import { PokemonService } from "../../../infrastructure/communication/services/pokemon.service";
import { Alert, Box, Button, Typography } from "@mui/joy";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  handlerGetForm,
  handlerGetPokemon,
} from "../../../infrastructure/handler/handler-fetch-pokemon";
import { log } from "console";
import { MessagesSystemEnum } from "../../../domain/enum/messages.enum";

const ctx = createContext({})

const AddPokemonButton = (params:any) => {
  const { url } = params.row;
  const value:any = useContext(ctx) 

  return (
    <Button
      onClick={async () => {
        const urlPokemon = await handlerGetForm(url);
        const pokemon = await handlerGetPokemon(urlPokemon);
        const { token, idDocument } = JSON.parse(
          localStorage.getItem("token") as string
        );
        if (token && idDocument) {
          pokemon.user = idDocument;
          const pokemonResponse = await pokemonService.addPokemon(
            pokemon,
            token
          );
          
          setTimeout(() => value.setOpen(false), 5000)
          if (pokemonResponse == MessagesSystemEnum.POKEMON_ALREADY_EXIST) {
            value.setOpen({
              message: pokemonResponse,
              color: 'danger'
            })
          }
          else {
            value.setOpen({
              message: `${pokemon.name} added to favorites`,
              color: 'success'
            })
          }
        }
      }}
      size="md"
      variant="solid"
      color="info"
    >
      Add pokemon
    </Button>
  );
}

const pokemonService = PokemonService.Instance;
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name Pokemon",
    width: 500,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "url",
    headerName: "Add pokemon to favorites",
    width: 300,
    align: "center",
    headerAlign: "center",
    renderCell: AddPokemonButton
  },
];

export function AddPokemon() {
  const [pokemon, setPokemon] = useState<Array<any>>([]);
  const [open, setOpen] = useState<any>(false)

  useEffect(() => {
    const pokemonService = PokemonService.Instance;
    const getAllPokemon = async () => {
      const response = await pokemonService.getAllPokemon();
      if (response.results) {
        setPokemon(response.results);
      }
    };
    getAllPokemon();
  }, []);

  return (
    <ctx.Provider value={{open, setOpen }}>

    <Box>
      <Typography level="h2">
        List of pokemon to add to your favorites list
      </Typography>

      <Box sx={{ py: 4 }}>
        <DataGrid
          rows={pokemon.length > 0 ? pokemon : []}
          columns={columns}
          getRowId={(row: any) => row.name}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
        {open && (

          <Alert color={open.color}>
            {open.message}
          </Alert>
        )}
      </Box>
    </Box>
    </ctx.Provider>

  );
}