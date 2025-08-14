---
layout: blog-post
title: "数学公式与表格渲染测试"
date: 2023-12-15 14:30:00 +0800
category: tech
tags: ["测试", "数学公式", "表格", "Markdown"]
excerpt: "测试博客系统的数学公式和表格渲染功能。"
author: "Ruixi Zhang"
reading_time: 8
featured: true
---

# 数学公式与表格渲染测试

## 数学公式测试

### 行内公式
这是一个行内公式：$E = mc^2$，爱因斯坦的质能方程。

另一个行内公式：$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$

### 块级公式
这是一个块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 复杂公式
矩阵公式：

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix} =
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

## 表格测试

### 简单表格
| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |
| 王五 | 28   | 产品经理 |

### 复杂表格
| 算法 | 时间复杂度 | 空间复杂度 | 稳定性 |
|------|------------|------------|--------|
| 冒泡排序 | $O(n^2)$ | $O(1)$ | 稳定 |
| 快速排序 | $O(n \log n)$ | $O(\log n)$ | 不稳定 |
| 归并排序 | $O(n \log n)$ | $O(n)$ | 稳定 |

## 代码块测试

```python
def fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 测试
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

## 列表测试

### 无序列表
- 第一项
- 第二项
  - 子项1
  - 子项2
- 第三项

### 有序列表
1. 第一步
2. 第二步
   1. 子步骤1
   2. 子步骤2
3. 第三步

## 引用测试

> 这是一段引用文字，用来测试引用块的样式。
> 
> 可以包含多行内容。

## 总结

这篇文章测试了博客系统的各种渲染功能：
- ✅ 数学公式（行内和块级）
- ✅ 表格渲染
- ✅ 代码高亮
- ✅ 列表样式
- ✅ 引用样式

所有功能都应该正常显示。
