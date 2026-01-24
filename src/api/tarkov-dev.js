// fetch request to api.tarkov.dev Graphql.  This fetch request in effect pulls the ENITRE item dataset from Escape from Tarkov as well as the maps.  The items dataset then
// gets filtered by child components to be rendered and displayed out to the user in the UI

const TTL = 300000; // 5 minutes

export async function getTarkovData() {
  const storedData = localStorage.getItem("tarkov item data");
  const parsedData = JSON.parse(storedData);

  if (storedData && parsedData.exp > Date.now()) {
    return { items: parsedData.items, maps: parsedData.maps };
  }

  const allItems = await fetch("https://api.tarkov.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `{
                items(categoryNames: ["Headphones", "Armor", "Headwear", "Chest rig", "Backpack", "Weapon", "Meds"]){
                  name
                  shortName
                  types
                  description
                  blocksHeadphones
                  conflictingItems {
                    name
                  }
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

  if (data.errors) {
    throw new Error("Unable to retrieve Tarkov Item data");
  }

  const items = data.data.items;
  const maps = data.data.maps;

  localStorage.setItem(
    "tarkov item data",
    JSON.stringify({
      items,
      maps,
      exp: Date.now() + TTL,
    })
  );

  return { items, maps };
}
