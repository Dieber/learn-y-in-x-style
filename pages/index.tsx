import Head from "next/head";
import Image from "next/future/image";
import ExternalLink from "../component/ExternalLink";
import { useState } from "react";
import docs from "./api/docs.json";

const DOT_SIZE = 30;
const BORDER_RADIUS = DOT_SIZE / 4;
const GAP = DOT_SIZE * 1.25;

type YLanguage = {
  name: string;
  articles: Array<{
    title: string;
    url: string;
  }>;
  fromStyle: string;
};

export default function Home() {
  const [activeItem, setActiveItem] = useState<YLanguage | null>(null);

  // resolve JSON from YAML file
  const rowName = docs.map((item) => item.name);
  const colName = docs.reduce<Array<string>>((prev, current) => {
    return prev.concat(
      current.languages.map((item) => {
        return item.name;
      })
    );
  }, []);

  // get all languages by concatenation
  const allLangs = Array.from(new Set([...rowName, ...colName]));

  // get wrapper size form language count
  const WRAPPER_SIZE = GAP * allLangs.length;

  // transform to cell with status
  const allCellsInfo = allLangs.map((row, rowIndex) => {
    return allLangs.map((col, colIndex) => {
      let findedItem = docs
        .find((item) => item.name === row)
        ?.languages.find((item) => item.name === col);
      return findedItem
        ? {
            isHover: false, // TODO: Hover Effect
            findedItem,
          }
        : {
            isHover: false,
          };
    });
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App">
        <div className="container">
          <h1>Learn Y in X Style</h1>
          <p>
            Learning a new programming language through an existing mental
            model. Also, Community-driven! Inspired by{" "}
            <ExternalLink
              title="Learn X in Y minutes"
              url="https://learnxinyminutes.com/"
            ></ExternalLink>
          </p>

          <div className="main-container">
            <div>
              <div
                className="row-icons"
                style={{
                  width: WRAPPER_SIZE,
                  height: DOT_SIZE,
                }}
              >
                {allLangs.map((item, index) => {
                  return (
                    <div
                      key={item}
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        left: index * GAP,
                      }}
                    >
                      <Image
                        alt={item}
                        width={DOT_SIZE}
                        height={DOT_SIZE}
                        src={`/images/${item}.png`}
                      ></Image>
                    </div>
                  );
                })}
              </div>

              <div
                className="col-icons"
                style={{
                  left: -DOT_SIZE - 8,
                }}
              >
                {allLangs.map((item, index) => {
                  return (
                    <div
                      key={item}
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        top: index * GAP,
                      }}
                    >
                      <Image
                        alt={item}
                        width={DOT_SIZE}
                        height={DOT_SIZE}
                        src={`/images/${item}.png`}
                      ></Image>
                    </div>
                  );
                })}
              </div>

              <div
                className="cells-wrapper"
                style={{
                  width: WRAPPER_SIZE,
                  height: WRAPPER_SIZE,
                }}
              >
                {allCellsInfo.map((rowItem, rowIndex) => {
                  return rowItem.map((colItem, colIndex) => {
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          top: rowIndex * GAP,
                          left: colIndex * GAP,
                          borderRadius: BORDER_RADIUS,
                          backgroundColor: colItem.findedItem
                            ? "#39d353"
                            : "#CCC",
                        }}
                        onClick={() => {
                          colItem.findedItem &&
                            setActiveItem(colItem.findedItem);
                        }}
                      ></div>
                    );
                  });
                })}
              </div>
            </div>
          </div>

          {activeItem && (
            <div>
              <h2>
                Where X = {activeItem.fromStyle} and Y = {activeItem.name}
              </h2>
              <p>
                You know {activeItem.fromStyle}, and you want to learn{" "}
                {activeItem.name}. Here are links to article(s).
              </p>
              {activeItem.articles.map((item) => {
                return (
                  <p key={item.title}>
                    <ExternalLink
                      url={item.url}
                      title={item.title}
                    ></ExternalLink>
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
