import { useRef } from "react";
import { Anchor, Row, Col } from "antd";
import { CLink, CPicture } from "@components/index";
import JsExe from "./imgs/js-exe.png";

const anchors = [
    {
        key: "basics",
        href: "#basics",
        title: "基础",
        children: [
            {
                key: "basics-basics",
                href: "#basics-basics",
                title: "基础",
                children: [
                    {
                        key: "basics-basics-q1",
                        href: "#basics-basics-q1",
                        title: "🪐 为什么是单线程？",
                    },
                ],
            },
        ],
    },
];
export default function JavaScript() {
    const container: any = useRef();
    const doClick = (e: any, link: object) => {
        e.preventDefault();
        console.log(link);
    };

    const doChange = (currentActiveLink: string) => {
        console.log(currentActiveLink);
    };
    return (
        <div className="js inner-view">
            <Row ref={container} className="inner-view__row">
                <Col className="inner-view__content" span={20}>
                    <div id="basics" className="basics">
                        <h1>基础</h1>
                        <div id="basics-basics">
                            <h2>基础</h2>
                            <div id="basics-basics-q1" className="question">
                                <h3>🪐 为什么是单线程？</h3>
                                <span>
                                    JS是作为浏览器的脚本语言，主要是实现用户与浏览器的交互以及操作dom；为了避免多线程操作Dom时的复杂性
                                    <strong>
                                        （如：一个线程要修改一个dom元素，另一个线程要删除这个dom元素）。
                                    </strong>
                                </span>
                            </div>
                            <div id="basics-basics-q2" className="question">
                                <h3>作用域</h3>
                                <span>
                                    <strong>
                                        作用域是在运行时代码中的某些特定部分中变量、函数和对象的可访问性。
                                    </strong>
                                    <br />
                                    作用域决定了代码区块中变量和其他资源的可见性。
                                    <br />
                                    从使用方面来解释，作用域就是变量的使用范围，也就是这个变量在程序的哪些区域可见。
                                </span>
                            </div>
                            <div id="basics-basics-q3" className="question">
                                <h3>💎 JavaScript执行原理</h3>
                                <span>
                                    <div>
                                        <CLink
                                            link="https://juejin.cn/post/6988458924630835231"
                                            text="掘金"
                                        ></CLink>
                                        <CLink
                                            link="https://www.cnblogs.com/pianruijie/p/11454598.html"
                                            text="cnblogs"
                                        ></CLink>
                                        <CPicture src={JsExe}></CPicture>
                                    </div>
                                    <div
                                        id="basics-basics-q3-q1"
                                        className="question"
                                    >
                                        <h4>语法分析阶段</h4>
                                        <span>
                                            <ol>
                                                <li>
                                                    解析：将Javascript代码解析为AST（抽象语法树）。
                                                    <ul>
                                                        <li>
                                                            词法分析：把代码中的字符串分割出来，生成一系列的token。
                                                        </li>
                                                        <li>
                                                            语法分析：语法分析的输入就是词法分析的输出，输出是AST抽象语法树，
                                                            AST是表示token关系的一棵树。
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        </span>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={4}>
                    <Anchor
                        getContainer={() => container.current}
                        onClick={doClick}
                        onChange={doChange}
                        items={anchors}
                    />
                </Col>
            </Row>
        </div>
    );
}
