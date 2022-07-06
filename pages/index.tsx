import Head from "next/head";
import Image from "next/image";
import ExternalLink from "../component/ExternalLink";
import { useState } from "react";
import docs from "./api/docs.json";
import Script from "next/script";
import Color from "color";

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
  const [hoverItem, setHoverItem] = useState<YLanguage | null>(null);

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
      let existedItem = docs
        .find((item) => item.name === row)
        ?.languages.find((item) => item.name === col);
      return existedItem
        ? {
            isHover: existedItem === hoverItem,
            existedItem,
          }
        : {
            isHover: false,
          };
    });
  });

  return (
    <>
      <Head>
        <title>Learn Y in X Style: Learning by comparison</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="App">
        <div className="container">
          <h1>Learn Y in X Style</h1>
          <p>
            Learning a new programming language through an existing mental
            model. Community-driven, just like{" "}
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
                        src={`/language_images/${item.toLowerCase()}.png`}
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
                        src={`/language_images/${item.toLowerCase()}.png`}
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
                    const existedColor = "#39d353";
                    const existHoverColor = Color(existedColor)
                      .darken(0.1)
                      .hex();
                    const notExistColor = "#CCC";
                    const activeColor = Color(existedColor).darken(0.2).hex();

                    let cellBackgroundColor;
                    if (colItem.existedItem === activeItem) {
                      cellBackgroundColor = activeColor;
                    } else if (
                      colItem.existedItem &&
                      colItem.existedItem === hoverItem
                    ) {
                      cellBackgroundColor = existHoverColor;
                    } else if (colItem.existedItem) {
                      cellBackgroundColor = existedColor;
                    } else {
                      cellBackgroundColor = notExistColor;
                    }

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                          position: "absolute",
                          cursor: colItem.existedItem ? "pointer" : "default",
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                          top: rowIndex * GAP,
                          left: colIndex * GAP,
                          borderRadius: BORDER_RADIUS,
                          backgroundColor: cellBackgroundColor,
                        }}
                        onMouseOver={() => {
                          colItem.existedItem &&
                            setHoverItem(colItem.existedItem);
                        }}
                        onMouseOut={() => {
                          setHoverItem(null);
                        }}
                        onClick={() => {
                          colItem.existedItem &&
                            setActiveItem(colItem.existedItem);
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
