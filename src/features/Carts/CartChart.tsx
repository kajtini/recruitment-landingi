import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Cart } from "./cartsTypes";

interface ChartSeriesData {
  name: string;
  data: Array<number>;
}

interface ChartOptions {
  chart: { id: string };
  xaxis: {
    categories: Array<string>;
  };
  tooltip?: {
    theme: "light" | "dark";
  };
}

interface ChartProps {
  options: ChartOptions;
  series: Array<ChartSeriesData>;
}

interface CartChartProps {
  cart: Cart;
}

const CartChart = ({ cart }: CartChartProps) => {
  const [chartProps, setChartProps] = useState<ChartProps | null>(null);

  useEffect(() => {
    if (cart) {
      setChartProps({
        options: {
          chart: {
            id: "product-chart",
          },
          xaxis: {
            categories: cart.products.map((product) => product.title),
          },
          tooltip: {
            theme: "dark",
          },
        },

        series: [
          {
            name: "price",
            data: cart.products.map((product) => product.price),
          },
          {
            name: "discounted price",
            data: cart.products.map((product) =>
              Math.trunc(product.discountedPrice / product.quantity)
            ),
          },
        ],
      });
    }
  }, [cart]);

  return (
    <>
      {chartProps && (
        <Chart
          options={chartProps.options}
          series={chartProps.series}
          type="line"
          width="100%"
          height="400px"
        />
      )}
    </>
  );
};

export default CartChart;
