// fetch request to api.tarkov.dev Graphql.  This fetch request in effect pulls the ENITRE item dataset from Escape from Tarkov as well as the maps.  The items dataset then
// gets filtered by child components to be rendered and displayed out to the user in the UI
export async function getTarkovData() {
  const allItems = await fetch("https://api.tarkov.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{
              items {
                name
                shortName
                types
                description
                blocksHeadphones
                inspectImageLink
                buyFor {
                  price
                  currency
                  vendor {
                    name
                  }
                }
                properties {
                  __typename
                  ...on ItemPropertiesWeapon {
                    defaultPreset {
                      shortName
                      inspectImageLink
                      buyFor {
                        price
                        currency
                        vendor {
                          name
                        }
                      }
                    }
                  }
                }
              }
              maps {
                name
                description
                enemies
                raidDuration
              }
          }`,
    }),
  });
  const data = await allItems.json();

  return { items: data.data.items, maps: data.data.maps };
}
