---
layout: post
title: "Geometry in Deep Learning: A Primer on Groups and Representations"
date: 2025-09-15 12:00:00+0200
categories: [deep learning, mathematics]
tags: [geometry, group theory, representation theory]
description: "An introduction to the role of geometry, group theory, and representation theory in modern deep learning."
toc:
  sidebar: left
published: true
---

## Introduction

Large Language Models (LLMs) are transforming the landscape of artificial intelligence, impacting everything from professional businesses to personal productivity, for better or for worse. This technological boom is being driven by large advancements in a field called deep learning. The core driving principle is "what if we could use more data, more computers, and more complex models''. [Experience shows](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf) that this is a remarkably effective approach, but it also raises ethical questions about the sourcing of data, the environmental impact of training ever larger models (not [just energy](https://edition.cnn.com/2024/09/20/energy/three-mile-island-microsoft-ai/index.html), but [also water](https://www.newsweek.com/why-ai-so-thirsty-data-centers-use-massive-amounts-water-1882374) is becoming an issue), and the ever increasing complexity of combating biases in these models.

In light of this trend of scale, shouldn't we ask what additional innovations are being missed in light of this already winning recipe? Now, I don't want to make it sound as if all scientists are focussing only on scale, in fact the opposite is true. It is just that many recent advancements, and especially those highlighted to the public eye by the media, and companies such as OpenAI, Google, and Facebook, are about scale.

This post dives into one avenue of research aiming to increase data-efficiency, robustness, and incorporating fundamental priors into models. I hope to do so by providing a gentle introduction into the mathematics used for **Geometric Deep Learning**.

## Why Geometry in Deep Learning?

Data, be it natural language or the location of galaxies in our universe, often possesses intrinsic geometric properties or symmetries. Consider these examples:

- **Images:** An object or person's identity doesn't change if it's shifted *(translated)* or tilted *(rotated)* in an image.
- **Molecules:** The properties of a molecule are _invariant_ to its rotation or translation in 3D space, and to the _permutation_ of its identical atoms.
- **Word Embeddings:** Words can be represented as vectors in a high-dimensional space. The geometric embedding of these vectors can capture semantic relationships. For instance, as vectors: $$v_\text{woman} \approx v_\text{man} + v_\text{queen} - v_\text{king}$$. (This is an [oversimplification](https://blog.esciencecenter.nl/king-man-woman-king-9a7fd2935a85) for pedagogical purposes that is used in many tutorials, but it is not as straightforward as this example makes it seem.)

Deep learning models that don't have any symmetry built in have to learn these symmetries from large amounts of data, which can be highly inefficient. Imagine having to relearn what someone looks like every time they look in a slightly different direction... Geometric deep learning proposes that by explicitly building these known symmetries into our models, we can achieve:

- **Better data efficiency:** Models need less data because they don't have to re-learn fundamental invariances.
- **Improved generalization:** Models are more likely to perform well on unseen data that exhibits similar symmetries.
- **Increased robustness:** Models are less sensitive to irrelevant variations in the input.

## Group Theory: A Language of Symmetry

What all these examples had in common was the presence of symmetries. In mathematics symmetries are described by the field of **algebra**, but more specifically the field of **group theory**. Groups provide us with a powerful language to formally discuss these symmetries.

Formally, a group $$(G, \cdot)$$ consists of:

1. A set $$G$$ of elements.
2. A binary operation $$\cdot$$ that combines any two elements $$a, b \in G$$ (abbreviated as $$a, b \in G$$) to form another element $$a \cdot b \in G$$.

This operation must satisfy a few properties, or axioms:

- **Associativity:** For all $$a, b, c \in G$$, we have $$(a \cdot b) \cdot c = a \cdot (b \cdot c)$$.
- **Identity Element:** There exists an element $$e \in G$$ (the identity) such that for every $$a \in G$$, $$e \cdot a = a \cdot e = a$$.
- **Inverse Element:** For each $$a \in G$$, there exists an element $$b \in G$$ (the inverse of $$a$$, often denoted $$a^{-1}$$) such that $$a \cdot b = b \cdot a = e$$.

The reason for these seemingly arbitrary requirements is partially empirical: they are complete enough to capture almost any symmetry we wish to describe, yet they are minimal enough that losing any one of them would make the resulting structure [much less interesting](https://math.stackexchange.com/a/4859969). To give you a sense of why these axioms indeed capture almost any symmetry we wish to describe, we have to first give some examples of groups.

**Examples of Groups:**

- **Integers with Addition $$(\mathbb{Z}, +)$$:**

  - Set: All integers $${\ldots, -2, -1, 0, 1, 2, \ldots}$$.
  - Operation: Standard addition.
  - Closure: Adding two integers gives an integer.
  - Associativity: $$(a + b) + c = a + (b + c)$$.
  - Identity: $$0$$.
  - Inverse: For any integer $$a$$, its inverse is $$-a$$.

This example should be familiar. All we are saying is that the numbers we know are apparently a group if we are talking about addition. So far so good.

- **Symmetry Groups of Sets:**

  - Set: All possible transformations of a set $$X$$.
  - Operation: Composition of transformations.
  - Closure: Composing two transformations gives another transformation.
  - Associativity: $$f \circ (g \circ h)(x) = (f \circ g) \circ h(x)$$.
  - Identity: The identity transformation (does nothing).
  - Inverse: The inverse of a transformation is the one that undoes it.

Let's work out this example more explicitly, Take $$X = \{1, 2, 3\}$$. The symmetry group of this set consists of all permutations of the elements in $$X$$. Or more intuitively, shuffling these numbers into any order is an element in the symmetry group. For example, the permutation that swaps $$1$$ and $$2$$ is one such transformation or element which we will write as $$(1 \to 2)$$ or $$(1 \: 2)$$. The composition of two permutations is another permutation $$(1 \: 2) \circ (2 \: 3) = (1 \: 2 \: 3)$$. You can verify that this indeed satisfies all the axioms of a group.

- **Symmetry Groups of Objects:**

  - Set: All transformations of a geometric object (like a square).
  - Operation: Composition of transformations.
  - Closure: Composing two transformations gives another transformation.
  - Associativity: $$f \circ (g \circ h)(x) = (f \circ g) \circ h(x)$$.
  - Identity: The identity transformation (does nothing).
  - Inverse: The inverse of a transformation is the one that undoes it.

This looks eerily similar to the previous example! But there is a subtle important difference. The set of transformations is not just any set of transformations, but the set of transformations that preserve the structure of the object. For example, consider a square. The symmetries of a square are all the transformations that don't change its appearance. The transformations include:

- Rotating it by $$0$$°, $$90$$°, $$180$$°, or $$270$$°.
- Mirroring *(reflecting)* it across its diagonals or mirroring through the midpoints of its sides.

If we label the corners of the square with the numbers $$1, 2, 3, 4$$ in order, we can represent the rotation by $$90$$° as the permutation $$(1 \: 2 \: 3 \: 4)$$ and the reflection across the vertical axis can be represented as $$(1 \: 4)(2 \: 3)$$. But the permutation $$(1 \: 2)$$ is not a symmetry of the square, because it changes the structure of the square. Try it! You'll get a "$$\bowtie$$" instead of a square.

The point I am trying to make is that some symmetries are restricted in some manner, causing them to be a part of another group of symmetries. This is formalized with [subgroups](https://en.wikipedia.org/wiki/Subgroup) and [homomorphisms](https://en.wikipedia.org/wiki/Homomorphism). To get back to the claim that the group axioms capture almost any symmetry we could wish to describe, we can now make it slightly more precise. The more correct claim is that any symmetry that we could want to describe is part of the group of symmetries corresponding to its labels. We saw this with the square, where its symmetries were a subgroup of the group of all permutations of the set $$X = \{1, 2, 3, 4\}$$. This is formalized by [Caley's Theorem](https://en.wikipedia.org/wiki/Cayley%27s_theorem), and explained more intuitively on [Math Stack Exchange](https://math.stackexchange.com/questions/369676/can-someone-explain-cayleys-theorem-step-by-step#369702).

## Representation Theory: Making Groups Concrete

If group theory provides the abstract language for symmetry, representation theory is what allows us to make these abstract concepts concrete and apply them to data. Our data in deep learning (images, text embeddings, etc.) often lives in vector spaces.

A representation of a group $$G$$ is essentially a way to "map" each element of $$G$$ to a linear transformation (like a matrix) that can act on a vector space $$V$$.

More formally, a linear representation $$\rho$$ (pronounced rho) of a group $$G$$ on a vector space $$V$$ is a homomorphism from $$G$$ to $$GL(V)$$. That is a mouthfull... Though written out it might look more familiar, $$\rho \colon G \to GL(V)$$. This means:

1. For every group element $$g \in G$$, $$\rho(g)$$ is an invertible matrix (or linear operator).
2. $$\rho(e) = I$$ (the identity element of the group maps to the identity matrix/transformation).
3. $$\rho(g_1 \cdot g_2) = \rho(g_1) \rho(g_2)$$ (the group operation is preserved – applying the group operation and then taking its representation is the same as taking its representation and then applying the matrix multiplication).

**Why is this useful?**
If we have data $$x$$ in a vector space $$V$$, and a group $$G$$ that acts on this data (e.g., rotations acting on an image), a representation $$\rho(g)$$ tells us _how_ a specific group transformation $$g$$ actually changes our data vector $$x$$. We can write this as $$\rho(g)x$$, or more succinctly as $$\rho_g(x)$$.

This allows us to define how neural network layers should behave when their inputs are transformed according to a symmetry group.

## Bridging the gap to Deep Learning: Equivariance and Invariance

Two key concepts from representation theory are vital for geometric deep learning: equivariance and invariance.

Let $$\Phi$$ be a neural network layer or function, and let $$g$$ be a transformation from a group $$G$$. Let $$\rho_{in}(g)$$ be the representation of $$g$$ acting on the input space, and $$\rho_{out}(g)$$ be the representation of $$g$$ acting on the output space.

- **Equivariance:** A layer $$\Phi$$ is equivariant to the group $$G$$ if transforming the input by $$g$$ and then passing it through $$\Phi$$ is the same as passing the input through $$\Phi$$ first and then transforming the output by the corresponding $$\rho_{out}(g)$$.
  Mathematically: $$\Phi(\rho_{in}(g) x) = \rho_{out}(g) \Phi(x)$$ for all $$g \in G$$ and inputs $$x$$.
  _Example:_ Convolutional layers in CNNs are (approximately) equivariant to translations. If you shift the input image, the feature maps also shift.

- **Invariance:** A layer $$\Phi$$ is invariant to the group $$G$$ if transforming the input by $$g$$ does not change the output at all.
  Mathematically: $$\Phi(\rho_{in}(g) x) = \Phi(x)$$ for all $$g \in G$$ and inputs $$x$$.
  _Example:_ A global pooling layer in a CNN, which aggregates features across all spatial locations, aims to achieve invariance to translation. The final classification of an object should be the same regardless of where it appears in the image.

Designing neural network layers that are explicitly equivariant (or invariant) to relevant symmetries is a cornerstone of geometric deep learning. Group theory and representation theory provide the precise mathematical tools to construct such layers. For instance, **Group Equivariant Convolutional Neural Networks (G-CNNs)** generalize standard convolutions to other symmetry groups beyond just translations, such as rotations and reflections.

## Conclusion

Geometry, through the lens of group theory and representation theory, offers a profound and principled way to enhance deep learning models. By understanding and embedding the symmetries inherent in data, we can build models that are not only more performant and data-efficient but also more aligned with the fundamental structures of the problems we aim to solve.

This was a brief tour, but hopefully, it has piqued your interest in the beautiful interplay between abstract algebra and cutting-edge artificial intelligence. The field of geometric deep learning is vibrant and expanding, promising exciting new developments over the coming years.

---

*Further Reading*

- *Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges* (Bronstein, Bruna, Cohen, Veličković)
