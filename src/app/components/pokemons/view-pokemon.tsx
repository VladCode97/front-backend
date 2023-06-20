import { PokemonService } from "../../../infrastructure/communication/services/pokemon.service";
import React, { useCallback, useEffect, useState } from "react";
import { IPokemon } from "../../../domain/models/pokemon.model";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Grid,
  Typography,
} from "@mui/joy";

export function ViewPokemon() {
  const pokemonService = PokemonService.Instance;
  const { idDocument, token } = JSON.parse(
    localStorage.getItem("token") as string
  );
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [invalidate, setInvalidate] = useState(0)

  useEffect(() => {
    const getPokemonByUser = async () => {
      if (idDocument && token) {
        const response = await pokemonService.viewPokemonByUser(
          idDocument,
          token
        );

        if (response.length > 0) {
          setPokemon(response);
        }
      }
    }
    getPokemonByUser();
  }, [invalidate]);
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Typography level="h2">list of my pokemon</Typography>
      <Box sx={{ paddingY: 2 }} />
      <Grid container spacing={2}>
        {pokemon.length > 0 &&
          pokemon.map((po) => {
            return (
              <Grid key={po.name} xs={12} lg={12 / 3}>
                <Card variant="outlined" sx={{ width: "60%", minWidth: 200 }}>
                  <CardOverflow>
                    <AspectRatio ratio="16/9">
                      <img
                        src={po.photo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent>
                    <Typography level="h2" fontSize="md">
                      {po.name}
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5 }}>
                      version: {po.versionPokemon}
                    </Typography>
                  </CardContent>
                  <CardOverflow
                    variant="soft"
                    sx={{ bgcolor: "background.level1" }}
                  >
                    <Button
                      color="danger"
                      onClick={() => {
                        if (!po._id) return;
                        
                        pokemonService.deletePokemonByUser(po._id, token)
                          .then(() => setInvalidate(Math.random()))
                      }}
                    >
                      Removed of my list
                    </Button>
                  </CardOverflow>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
