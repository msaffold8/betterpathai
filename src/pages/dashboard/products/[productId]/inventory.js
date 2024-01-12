import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Card, CardHeader, Divider, Skeleton } from "@mui/material";
import { productsApi } from "../../../../api/products";
import { ResourceError } from "../../../../components/resource-error";
import { ResourceUnavailable } from "../../../../components/resource-unavailable";
import { useMounted } from "../../../../hooks/use-mounted";
import { usePageView } from "../../../../hooks/use-page-view";
import { Layout as DashboardLayout } from "../../../../layouts/dashboard";
import { Layout as ProductLayout } from "../../../../layouts/product";
import { ProductVariantsTable } from "../../../../sections/dashboard/products/course-modules-table";

const useProductStore = () => {
  const isMounted = useMounted();
  const [state, setState] = useState({ isLoading: true });

  const handleProductGet = useCallback(async () => {
    setState({ isLoading: true });

    try {
      const response = await productsApi.getProduct();

      if (isMounted()) {
        setState({ data: response });
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setState({ error: "Something went wrong" });
      }
    }
  }, [isMounted]);

  const handleVariantQuantityChange = useCallback((variantId, quantity) => {
    // Do API call

    setState((prevState) => {
      if (!prevState.data) {
        return prevState;
      }

      const updatedVariants = prevState.data.variants?.map((variant) => {
        if (variant.id === variantId) {
          return {
            ...variant,
            quantity,
          };
        }

        return variant;
      });

      return {
        ...prevState,
        data: {
          ...prevState.data,
          variants: updatedVariants,
        },
      };
    });
  }, []);

  useEffect(
    () => {
      handleProductGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    handleVariantQuantityChange,
    state,
  };
};

const getResourcesState = (storeState) => {
  if (storeState.isLoading) {
    return "loading";
  }

  if (storeState.error) {
    return "error";
  }

  return storeState.data ? "available" : "unavailable";
};

const Page = () => {
  const productStore = useProductStore();

  usePageView();

  const resourcesState = getResourcesState(productStore.state);

  return (
    <>
      <Head>
        <title>Product: Inventory | Better Path</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Card
          sx={{
            minHeight: 600,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader title="Inventory Management" />
          <Divider />
          {resourcesState === "loading" && (
            <Box sx={{ m: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {resourcesState === "error" && (
            <ResourceError
              message="Something went wrong"
              sx={{
                flexGrow: 1,
                m: 2,
              }}
            />
          )}
          {resourcesState === "unavailable" && (
            <ResourceUnavailable
              message="Inventory is not available"
              sx={{
                flexGrow: 1,
                m: 2,
              }}
            />
          )}
          {resourcesState === "available" && (
            <ProductVariantsTable
              variants={productStore.state.data?.variants}
              onQuantityChange={productStore.handleVariantQuantityChange}
            />
          )}
        </Card>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    <ProductLayout>{page}</ProductLayout>
  </DashboardLayout>
);

export default Page;
